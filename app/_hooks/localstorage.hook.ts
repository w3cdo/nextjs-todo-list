"use client";
import { useEffect, useState } from "react";
import { Task } from "../tasks";

export function useLocalStorage(key: string) {
    const [value, setValue] = useState<Task[]>();

    useEffect(() => {
        try {
            const storedValue = localStorage.getItem(key);

            setValue(storedValue ? JSON.parse(storedValue) : []);
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    const updateValue = (newValue: any) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };

    return {
        value,
        updateValue
    }
}