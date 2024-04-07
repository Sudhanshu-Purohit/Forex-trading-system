import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Account } from "src/accounts/schemas/accounts.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload) {
        const { id } = payload;
        const user = await this.accountModel.findById(id);

        if(!user) {
            throw new UnauthorizedException("Unauthorized user");
        }

        return user;
    }
}