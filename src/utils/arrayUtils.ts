type Item = {
    id: string
}

export const findItemIndexById = <TItem extends Item>(
    items: TItem[],
    id: string
) => {
    return items.findIndex((item, TItem) => item.id === id)
}

// const itemsWithoutId = [{text: "test"}]
// findItemIndexById(itemsWithoutId, "testId")