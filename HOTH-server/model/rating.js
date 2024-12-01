const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  Epicuria: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  DeNeve: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  FeastAtRieber: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  BruinPlate: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  BruinCafe: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  Rendezvous: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  HedrickStudy: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  Drey: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  EpicAtAckerman: {
    stars: { type: Number, default: null },
    comment: { type: String, default: null },
  },
});

module.exports = ratingSchema;
