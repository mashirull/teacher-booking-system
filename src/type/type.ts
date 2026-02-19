export interface User {
    _id: string
    name: string
    email: string
    password: string
    role: string
    status: string
}

export interface Teacher {
    _id?: string
    name: string
    email: string
    subject: string
    department: string
    password?: string
    teacherId?: string
}

export interface Student {
    _id?: string
    name: string
    email: string
    password?: string
    status : string
    studentId?: string
}