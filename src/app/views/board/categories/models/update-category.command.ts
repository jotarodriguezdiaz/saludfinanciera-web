export interface UpdateCategoryCommand {
    categoryId: number;
    name: string | null;
    description: string | null;
    userId: string;
}