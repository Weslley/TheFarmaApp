import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TimerCountdown extends React.Component {
    static defaultProps = {
        interval: 1000,
        formatSecondsRemaining: null,
        onTick: null,
        onTimeElapsed: null
    };

    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            secondsRemaining: this.props.initialSecondsRemaining,
            timeoutId: null,
            previousSeconds: null
        };

        this.tick = () => {
            const currentSeconds = Date.now();
            const dt = this.state.previousSeconds ? currentSeconds - this.state.previousSeconds : 0;
            const interval = this.props.interval;
            const intervalSecondsRemaing = interval - (dt % interval);
            let timeout = intervalSecondsRemaing;
            if (intervalSecondsRemaing < interval / 2.0) {
                timeout += interval;
            }
            const secondsRemaining = Math.max(this.state.secondsRemaining - dt, 0);
            const isComplete = this.state.previousSeconds && secondsRemaining <= 0;
            if (this.mounted) {
                if (this.state.timeoutId) {
                    clearTimeout(this.state.timeoutId);
                }
                this.setState({
                    timeoutId: isComplete ? null : setTimeout(this.tick, timeout),
                    previousSeconds: currentSeconds,
                    secondsRemaining
                });
            }
            if (isComplete) {
                if (this.props.onTimeElapsed) {
                    this.props.onTimeElapsed();
                }
                return;
            }
            if (this.props.onTick) {
                this.props.onTick(secondsRemaining);
            }
        };

        this.getFormattedTime = (milliseconds) => {
            if (this.props.formatSecondsRemaining) {
                return this.props.formatSecondsRemaining(milliseconds);
            }
            const remainingSec = Math.round(milliseconds / 1000);
            const seconds = parseInt((remainingSec % 60).toString(), 10);
            const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
            const hours = parseInt((remainingSec / 3600).toString(), 10);
            const s = seconds < 10 ? '0' + seconds : seconds;
            const m = minutes < 10 ? '0' + minutes : minutes;
            let h = hours < 10 ? '0' + hours : hours;
            h = h === '00' ? '' : h + ':';
            return `${s}s`;
            //return h + m + ':' + s;
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.tick();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.timeoutId) {
            clearTimeout(this.state.timeoutId);
        }
        this.setState({
            previousSeconds: null,
            secondsRemaining: newProps.initialSecondsRemaining
        });
    }

    componentDidUpdate() {
        if (!this.state.previousSeconds && this.state.secondsRemaining > 0 && this.mounted) {
            this.tick();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.state.timeoutId);
    }

    render() {
        const secondsRemaining = this.state.secondsRemaining;
        const allowFontScaling = this.props.allowFontScaling;
        const style = this.props.style;
        return (
            <Text allowFontScaling={allowFontScaling} style={style}>
                {this.getFormattedTime(secondsRemaining)}
            </Text>
        );
    }
}
