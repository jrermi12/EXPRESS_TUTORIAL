import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import {IToken} from "../interface/token.interface";
import TokenModel from "../model/token.model";

export async function getAllTokens() {
    return await TokenModel.find();
}

export async function findTokenById(id: string) {
    return await TokenModel.findById(id);
}

export async function findToken(
    query: FilterQuery<IToken>,
    options: QueryOptions = { lean: true }
): Promise<IToken | null> {
    return await TokenModel.findOne(query, {}, options);
}

export async function createToken(tokenData: Partial<IToken>) {
    try {
        const result = await TokenModel.create(tokenData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteTokenById(id: string) {
    return await TokenModel.deleteOne({ _id: id });
}

export async function updateTokenById(
    id: string,
    update: UpdateQuery<IToken>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await TokenModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
