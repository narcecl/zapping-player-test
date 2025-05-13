export type ShowItem = {
    name: string;
    originalTitle: string;
    year: number;
    rating: string;
    duration: string;
    genres: string[];
    poster: string;
    description: string;
    imdb?: string;
};

export type Show = {
    [key: string]: ShowItem;
};

export interface DefaultChannel {
    logo_color: string;
    logo_white: string;
    name: string;
    number: number;
}

export interface Channel extends DefaultChannel {
    active: boolean;
    currentShow: Show;
    video: string;
}

export type ChannelLogo = {
    logo: DefaultChannel['logo_color'];
} & Pick<Channel, 'name'>;

export interface ChannelResponse {
    data: Channel[];
    status: boolean;
}
