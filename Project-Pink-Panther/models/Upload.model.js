const { Schema, model } = require("mongoose");
const Tag = require("./Tag.model");

const uploadSchema = new Schema(
  {
    tagName: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },

    img: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        required: true,
      },
      coordinates: [{ type: Number, required: true }],
    },
  },
  {
    timestamps: true,
  }
);

// uploadSchema.index({ location: '2dsphere' })

const Upload = model("Upload", uploadSchema);

module.exports = Upload;
