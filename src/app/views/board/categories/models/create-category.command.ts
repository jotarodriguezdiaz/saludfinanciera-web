export interface CreateCategoryCommand {
    categoryId: number;
    name: string | null;
    description: string | null;
    userId: string;
}