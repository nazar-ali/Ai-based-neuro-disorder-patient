// src/utils/formUtils.ts

/**
 * Generic reusable state updater for nested or array-based form structures.
 *
 * @param prev - The previous form state
 * @param key - The field key being updated
 * @param value - The new value
 * @param parent - Optional parent object key
 * @param index - Optional array index (if updating within an array)
 * @returns The updated form object
 */
export const updateFormState = <T extends Record<string, any>>(
  prev: T,
  key: string,
  value: any,
  parent?: string,
  index?: number
): T => {
  if (parent && index !== undefined) {
    const updatedArray = [...(prev[parent] as any[])]
    const item = { ...updatedArray[index], [key]: value }
    updatedArray[index] = item
    return { ...prev, [parent]: updatedArray }
  }

  if (parent) {
    const parentValue = prev[parent]
    const safeParentValue =
      typeof parentValue === "object" && parentValue !== null ? parentValue : {}
    return { ...prev, [parent]: { ...safeParentValue, [key]: value } }
  }

  return { ...prev, [key]: value }
}
