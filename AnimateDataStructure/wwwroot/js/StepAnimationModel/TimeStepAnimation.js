
export class TimeStepAnimation
{
    constructor(timeDurationStep, timeDelayStep)
    {
        this.timeDurationStep = timeDurationStep;
        this.timeDelayStep = timeDelayStep;
    }

    getTimeDurationStep()
    {
        return this.timeDurationStep;
    }

    setTimeDurationStep(timeDurationStep)
    {
        this.timeDurationStep = timeDurationStep
    }

    getTimeDelayStep()
    {
        return this.timeDelayStep;
    }

    setTimeDurationStep(timeDurationStep)
    {
        this.timeDurationStep = timeDurationStep
    }
}