export interface IdObject { id: string }

export type ObjWithId<T> = T & IdObject
export type ObjWithPossibleId<T> = T & Partial<IdObject>
export type ObjWithPossiblePersistable<T> = T & Partial<PersistableObject>

export interface MetaObj {
    meta: Meta
}
export interface VersionMetaObj extends MetaObj { version: number }
export interface PersistableObject extends IdObject, VersionMetaObj { }

export type MetaKeyType = "meta.modified" | "meta.created"
export type UnderScoreIdType = "_id"
export interface Meta {
    created: Date
    modified: Date
}
