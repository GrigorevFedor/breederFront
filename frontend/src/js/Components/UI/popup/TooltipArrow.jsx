import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './TooltipArrow.scss';

function TooltipArrow({btnClass, btnContent, tooltipContent, tooltipClass}) {
    
    return (
        <Tooltip className={`tooltip ${tooltipClass}`} title={tooltipContent} arrow placement="right">
              <button className={`tooltip-button ${btnClass}`}>{btnContent}</button>
        </Tooltip>
    )
}

TooltipArrow.propTypes = {
    btnContent: PropTypes.node.isRequired,
    tooltipContent: PropTypes.string.isRequired,
    tooltipClass: PropTypes.string,
    btnClass: PropTypes.string
}


export default TooltipArrow
