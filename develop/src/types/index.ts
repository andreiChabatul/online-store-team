export interface IPromoCode {
    readonly name?: string;
    readonly discont?: number;
    readonly text?: string;
}

export interface IBasket {
    id: number;
    amount: number;
    price: number;
}

export interface IPagination {
    amount: number;
    selectPage: number;
}

export interface IFilter {
    category: string[],
    brand: string[],
}

export interface IFilterNumber {
    price: number[],
    stock: number[],
}

export interface IComponentUpdate {
    div?: HTMLDivElement;
    get(): HTMLDivElement;
    fill?(): void;
    render(): HTMLElement[] | void;
    clear?(): void;
    update(): void;
};

export interface IComponent {
    div?: HTMLDivElement;
    get(): HTMLDivElement;
    fill(): void;
    render(): HTMLElement[];
    clear?(): void;
    update?(): void;
};

export interface IRenderComponent {
    div?: HTMLDivElement;
    render(): HTMLDivElement;
    update?(): void;
    get?(): HTMLDivElement;
}


export interface IRenderComponentForm {
    div?: HTMLDivElement;
    render(): HTMLFormElement;
}

export interface IRenderComponentSelect {
    div?: HTMLSelectElement;
    render(): HTMLElement[];
    get(): HTMLSelectElement;
}

export interface IInitPage {
    header: HTMLDivElement;
    main: HTMLDivElement;
    footer: HTMLDivElement;
    add(element: HTMLDivElement): void;
};


export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
}

export interface IResultQueryPatametr {
    brand?: string,
    category?: string,
    srch?: string,
    price?: string,
    stock?: string,
    sort?: string,
}

export interface IQueryPatametr {
    limit?: string,
    page?: string,
    search?: string,
    sort?: string,
    brand?: string,
    category?: string,
    price?: string,
    stock?: string,
}

export interface IFilterText {
    name: string,
    quantity: number,
    check: boolean,
}

export interface IObjFilter {
    [index: string]: IFilterText,

}

export type searchQuery = 'brand' | 'title' | 'description' | 'category';
export type sortQuery = 'price' | 'rating' | 'discountPercentage';
