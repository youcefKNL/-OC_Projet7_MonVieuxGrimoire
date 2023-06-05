const mongoose = require("mongoose");

const bannedIpSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const BannedIp = mongoose.model("BannedIp", bannedIpSchema);

module.exports = BannedIp;
