// utilities for navigation
import { navigate } from '@reach/router';

const postInfo = (oldPage, newPage, step, msg) => {
    if (window.parent && (window.parent !== window.self)) {
        // in iframe
        window.parent.postMessage({old: oldPage, new: newPage, step}, '*');
        console.log(`${msg} old ${oldPage} new ${newPage} step ${step}`);
    }
}

const nextSlide = ({ slug, length, index, setState }) => {
    const n = index + 1;
    if (n >= length) return;
    navigate([slug, n].join('/'));
    setState({ step: 0 });
    postInfo(index, n, 0, 'nextSlide');
};

export const next = context => {
    const { steps, step, setState } = context;
    if (!steps || step >= steps) return nextSlide(context);
    postInfo(context.index, context.index, step + 1, 'nextStep');
    setState({ step: step + 1 });
};

const previousSlide = ({ slug, index, metadata, setState }) => {
    const n = index - 1;
    if (n < 0) return;
    navigate([slug, n].join('/'));
    const { steps = 0 } = metadata[n] || {};
    setState({ step: steps });
    postInfo(index, n, steps, 'prevSlide');
};

export const previous = context => {
    const { steps, step, setState } = context;
    if (steps && step > 0) {
        postInfo(context.index, context.index, step - 1, 'prevStep');
        return setState({ step: step - 1 });
    }
    previousSlide(context);
};

export const jump = (slug, index,  next) => {
    postInfo(index, next, 0, 'jump');
    navigate([slug, next].join('/'));
}
