export interface ICrud<T> {
    insert(item: T | any): Promise<void>
    selectAll(): Promise<T[]>
    select(id: string): Promise<T>
    update(item: T | any): Promise<void>
    delete(id: string): Promise<void>
}
