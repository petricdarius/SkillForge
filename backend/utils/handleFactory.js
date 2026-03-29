const catchAsync = require('./catchAsync');
const APIFeatures = require('./apiFeatures');
const appError = require('./appError');

exports.createOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });
};

exports.updateOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError('No document found with that ID.', 404));
    }
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });
};

exports.deleteOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID.', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

//* This function returns a document, in multiple steps
//* 1) Create a query to find the doc based on id, but don't await it (by creating a query first, we can modify it based on populate options, hence not making requests to the database in multiple steps)
//* 2) If there are populate options, add populate to the query
//* 3) Await the query and get the document
exports.getOne = (Model, populateOptions) => {
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);

    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that ID.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: document,
    });
  });
};

//* This function returns a collection of documents
//* 1) Create a base filter object (empty by default)
//* 2) If a route parameter exists (e.g. courseId), apply it to filter results (used for nested routes)
//* 3) Initialize API features with the base query and request query string
//* 4) Chain multiple query features (filtering, sorting, field limiting, pagination)
//* 5) Execute the final query to retrieve the documents
exports.getAll = (Model) => {
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.courseId) filter = { course: req.params.courseId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      data: docs,
    });
  });
};
