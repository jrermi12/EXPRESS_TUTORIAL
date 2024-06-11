import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IProfile } from "../interface/profile.inerface";
import ProfileModel from "../model/profile.model";

export async function getAllProfiles() {
    return await ProfileModel.find().populate({
        path: 'userId',
        select: "-password -OTPCode -OTPCodeExpires -passwordResetCode -business",

    })
        .exec();
}

export async function findProfileById(id: string) {
    return await ProfileModel.findById(id).populate({
        path: 'userId',
        select: "-password -OTPCode -OTPCodeExpires -passwordResetCode -business",

    })
        .exec();
}

export async function findProfile(
    query: FilterQuery<IProfile>,
    options: QueryOptions = { lean: true }
): Promise<IProfile | null> {
    return await ProfileModel.findOne(query, {}, options);
}

export async function createProfile(profileData: Partial<IProfile>) {
    try {
        const result = await ProfileModel.create(profileData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteProfileById(id: string) {
    return await ProfileModel.deleteOne({ _id: id });
}

export async function updateProfileById(
    id: string,
    update: UpdateQuery<IProfile>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await ProfileModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
