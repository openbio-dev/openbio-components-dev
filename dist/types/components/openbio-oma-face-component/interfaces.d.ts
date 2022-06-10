export interface IOMAImages {
    faceType: string;
    faceData: string;
}
export interface IOMAMatcherBody extends IOMAMatcherImagelessBody {
    images: Array<IOMAImages>;
}
export interface IOMAMatcherImagelessBody {
    projectID: string;
    registrationID: string;
    requestKey: string;
}
