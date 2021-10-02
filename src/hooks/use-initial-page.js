import { useEffect } from 'react';
import useDeck from './use-deck';
import { jump } from '../navigate';

export const useInitialPage = () => {
    const { slug, index} = useDeck();
    useEffect(() => {
        if ((typeof window !== 'undefined') && window.location &&
            window.location.hash) {
            const pageNum = parseInt(window.location.hash.slice(1));
            if (!isNaN(pageNum)) {
                jump(slug, index, pageNum);
            }
        }
    }, []);
};

export default useInitialPage;
