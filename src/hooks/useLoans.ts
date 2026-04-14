import { useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Loan } from '../types/book';

function useLoans(uid: string | null) {
    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        if (!uid) {
            setLoans([]);
            return;
        }
        const ref = collection(db, 'users', uid, 'loans');
        const unsub = onSnapshot(ref, snap => {
            setLoans(snap.docs.map(d => d.data() as Loan));
        });
        return unsub;
    }, [uid]);

    const borrow = async (bookId: string, title: string) => {
        if (!uid) return;
        const ref = doc(db, 'users', uid, 'loans', bookId);
        await setDoc(ref, { bookId, title, borrowedAt: new Date().toISOString() });
    };

    const returnBook = async (bookId: string) => {
        if (!uid) return;
        await deleteDoc(doc(db, 'users', uid, 'loans', bookId));
    };

    const isBorrowed = (bookId: string) => loans.some(l => l.bookId === bookId);

    return { loans, borrow, returnBook, isBorrowed };
}

export default useLoans;