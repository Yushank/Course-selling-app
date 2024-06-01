import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import axios from 'axios';
import { BASE_URL } from "../src/config";

export const courseState = atom({
    key: 'courseState',
    default: selector({
        key: 'courseSelector',
        get: async () => {
            await new Promise(r=> setTimeout(r, 5000));
            const res = await axios.get(`${BASE_URL}/admin/courses`)
            return res.data.courses
        }
    })
})