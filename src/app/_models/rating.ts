export class RatingRequest {
    userOwnerEmail?: string;
    tableId?: number;
    rating?: Rating;
}

export class Rating{
    description?: string;
    ratingValue?: string;
    creationDate: string = Date.now().toString();
    userForeignKey?: string;
}