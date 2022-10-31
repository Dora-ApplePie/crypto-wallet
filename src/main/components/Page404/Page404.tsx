import React from 'react';
import style from './Page404.module.scss';

const Page404: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.errorPage}>PAGE 404</div>
        </div>
    )
}

export default Page404;
