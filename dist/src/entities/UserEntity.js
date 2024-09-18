"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var constants_1 = require("../constants");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "middleName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "profilePicture", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", String)
    ], User.prototype, "onboardingStep", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            nullable: true,
            default: constants_1.OnboardingStatus.InvitationSent,
        }),
        __metadata("design:type", String)
    ], User.prototype, "onboardingStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'boolean',
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "resetPassword", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "resetPasswordToken", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Date)
    ], User.prototype, "resetPasswordExpires", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "twoFactorToken", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Date)
    ], User.prototype, "twoFactorExpires", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "twoFactorEnabled", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'boolean',
            default: true,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "accountStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'timestamp',
            default: function () { return 'CURRENT_TIMESTAMP'; },
            onUpdate: 'CURRENT_TIMESTAMP',
        }),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isVerified", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "verificationToken", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "applicationNo", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            default: constants_1.UserRole.Applicant,
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
