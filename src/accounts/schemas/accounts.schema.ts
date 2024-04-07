import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Account {
    @Prop()
    name: string;

    @Prop({unique: [true, "Duplicate email"]})
    email: string;

    @Prop()
    password: string;

    @Prop({
        type: { USD: Number, EUR: Number, GBP: Number },
        default: { "USD": 0, "EUR": 0, "GBP": 0 } 
    })
    balances: { "USD": number, "EUR": number, "GBP": number };
}

export const AccountSchema = SchemaFactory.createForClass(Account);

