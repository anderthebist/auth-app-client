import React, { FC } from 'react';
import "./Preloader-module.scss";
import loader from '../../images/6.gif';
import { PreloaderSize } from '../../utils/enums';

type PreloaderOwnProps = {
    size?: PreloaderSize
}

const Preloader: FC<PreloaderOwnProps> = ({size = PreloaderSize.Small}) => {
    return (
        <div className = "preloader">
            <img src = {loader} style = {{width: `${size}px`}} alt="" />
        </div>
    );
} 

export default Preloader;