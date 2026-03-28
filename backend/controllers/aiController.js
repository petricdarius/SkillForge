const { GoogleGenAI } = require('@google/genai');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//* Function needs history to be defined in body or it won't work
//* Roles must be model for the AI and user for the User
exports.getAnswer = catchAsync(async (req, res, next) => {
  const { question, history } = req.body;

  const formattedHistory = (history || []).map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));
  let response;
  try {
    response = await ai.models.generateContent({
      model: 'models/gemini-flash-latest',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: question }] },
      ],
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }

  res.status(200).json({
    status: 'success',
    data: response.text,
  });
});
