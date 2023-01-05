class ApiLoader {
    async getData(url: string) {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            error instanceof Error ? console.log(error.message) : '';
            return false;
        }
    }
}

export default new ApiLoader();
