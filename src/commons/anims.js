export const PopInAnim = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3
        }
    }
}
export const TextAnimateY = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export const TextAnimateX = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0
    }
}

export const TextAnimateXRev = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0
    }
}

export const wrapAnim = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
}

export const wrapPopAnim = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
}

export const minimizeAnim = {
    visible: {
        scale: 0,
        opacity: 0,
        x: '120%',
        y: '100%',
        transition: {
            originX: 'right',
            originY: 'bottom',
            type: 'linear',
            duration: 0.1
        }
    },
    hidden: {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            originX: 'right',
            originY: 'bottom',
            type: 'linear',
            duration: 0.1
        }
    }
}

export const quickActionAnim = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        originX: 'left',
        originY: 'top'
    }
}

export const tableSettingsAnim = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        originX: 'right',
        originY: 'top'
    }
}

export const assessmentOptionAnim = {
    hidden: {
        width: 0
    },
    visible: {
        width: 'auto',
        transition: {
            type: 'linear'
        }
    }
}