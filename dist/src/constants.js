"use strict";
// src/constants.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatus = exports.UserRole = exports.Level = exports.StatusType = exports.Category = void 0;
var Category;
(function (Category) {
    Category["MARINE_EQUIPMENT"] = "Marine Equipment";
    Category["IT_EQUIPMENT"] = "IT Equipment";
    Category["AGRICULTURAL_EQUIPMENT"] = "Agricultural Equipment";
    Category["AUTOMOBILES"] = "Automobiles";
    Category["COLLECTIBLES"] = "Collectibles";
    Category["ART"] = "Art";
    Category["JEWELRY"] = "Jewelry";
    Category["TOYS_HOBBIES"] = "Toys & Hobbies";
    Category["SPORTS_OUTDOORS"] = "Sports & Outdoors";
    Category["HEALTH_BEAUTY"] = "Health & Beauty";
    Category["REAL_ESTATE"] = "Real Estate";
    Category["INDUSTRIAL_BUSINESS"] = "Industrial & Business";
})(Category || (exports.Category = Category = {}));
var StatusType;
(function (StatusType) {
    StatusType["PENDING"] = "Pending";
    StatusType["UPCOMING"] = "Upcoming";
    StatusType["LIVE"] = "Live";
})(StatusType || (exports.StatusType = StatusType = {}));
var Level;
(function (Level) {
    Level["NORMAL"] = "Normal";
    Level["LATEST"] = "Latest";
    Level["POPULAR"] = "Popular";
    Level["HIGHEST_BIDDING"] = "Highest Bidding";
})(Level || (exports.Level = Level = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Employer"] = "employer";
    UserRole["Applicant"] = "applicant";
})(UserRole || (exports.UserRole = UserRole = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["INACTIVE"] = "inactive";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
