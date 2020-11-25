"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestMultigrafModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMultigrafModule = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
let NestMultigrafModule = NestMultigrafModule_1 = class NestMultigrafModule {
    static forRoot(module, multigraf) {
        return {
            global: true,
            imports: [module],
            providers: [
                {
                    provide: services_1.MultiGrafProvider,
                    useValue: new services_1.MultiGrafProvider(multigraf),
                },
            ],
            exports: [services_1.MultiGrafProvider],
            module: NestMultigrafModule_1,
        };
    }
};
NestMultigrafModule = NestMultigrafModule_1 = __decorate([
    common_1.Module({})
], NestMultigrafModule);
exports.NestMultigrafModule = NestMultigrafModule;
//# sourceMappingURL=nestjs-multigraf.module.js.map