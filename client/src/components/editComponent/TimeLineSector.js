import React from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import connect from "react-redux/es/connect/connect";


const useStyles = ({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value} %`;
}

class TimeLineSector extends React.Component {
    //TODO get data for the represented video and set the range of this correctly
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {newValue: [0, 100]};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {duration} = this.props.currentEdit;
        this.setState(state => ({
            newValue: [0, duration]
        }));
    }

    handleChange = (event, newValue) => {
        this.setState(state => ({
            newValue: newValue
        }));
        this.props.callback(newValue);
    };

    initDuration = (duration) => {
        if(isNaN) return 0;
        return duration;
    }

    render() {
        // const classes = useStyles();
        const {duration} = this.props.currentEdit;

        return (
            <div className={useStyles.root}>
                <Typography id="range-slider" gutterBottom>
                   {this.props.title}
                </Typography>
                <Slider
                    value={this.state.newValue}
                    min = {0}
                    max = {this.initDuration(duration)}
                    onChange={this.handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </div>
        );
    }
}


// Mapping a redux state to a component property
const mapStateToProps = state => ({
    // item because we called it that in reducers/index.js (root reducer)
    item: state.item,
    currentEdit: state.edit,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {})(TimeLineSector);