import {
    FaUndoAlt,
    FaRegSquare,
    FaRegCheckSquare,
    FaPlus, FaMinus,
    FaRegCopy,
    FaRegThumbsDown,
    FaRegSurprise,
    FaRegMeh,
    FaRegSmileWink,
    FaRegSmileBeam,
    FaRegThumbsUp
} from "react-icons/fa";

import ButtonCharUsed from "./ButtonCharUsed";
import RangeBar from "./RangeBar";
import ButtonNormal from "./ButtonNormal";
import InputPassword from "./InputPassword";

import React, { useState, useEffect } from "react";
import './App.scss';

export default function App() {
    const MIN_LEN = 1;
    const MAX_LEN = 50;

    const [len, setLen] = useState(MIN_LEN);

    const [mayus, setMayus] = useState(true);
    const [minus, setMinus] = useState(true);
    const [nums, setNums] = useState(true);
    const [signs, setSigns] = useState(true);

    const [refresh, setRef] = useState(true);

    const [password, setPassword] = useState('');

    const getNums = (min, max) => {
        min ??= 0; max ??= 10;
        return Math.floor(Math.random() * (max - min) + min);
    }
    const getMinus = () => String.fromCharCode(getNums(97, 122));
    const getMayus = () => String(getMinus()).toUpperCase();
    const getSigns = () => {
        /* los rangos son signos en ascii, hay tres grupos separados por letras */
        const SIGNS = [getNums(33, 47), getNums(58, 64), getNums(91, 95)];
        return String.fromCharCode(SIGNS[getNums(0, 3)]);
    };

    const generatePassword = pass => {
        pass ??= '';
        const POSSIBLE = [];

        if (pass.length !== len) {
            /* si los parametros estan aviltados se agregan a una lista de elementos posibles */
            if (mayus) POSSIBLE.push({ random: getMayus });
            if (minus) POSSIBLE.push({ random: getMinus });
            if (nums) POSSIBLE.push({ random: getNums });
            if (signs) POSSIBLE.push({ random: getSigns });

            /* la prop random es una llamada a la funcion que genera un caractarer segun el param devuelto */
            const randomIndex = Math.floor(Math.random() * POSSIBLE.length);
            const newCharacter = POSSIBLE[randomIndex].random();
            return generatePassword(pass.concat(newCharacter));
        }
        setPassword(pass);
    };

    const setValue = val => {
        const bar = document.querySelector('#lenPassword');
        const value = bar.value;
        const parcial_value = Number(value) + val;
        let valeAbs = 0;

        if (parcial_value > MAX_LEN) {
            valeAbs = MAX_LEN;
        }
        if (parcial_value < MIN_LEN) {
            valeAbs = MIN_LEN;
        }
        if (parcial_value >= MIN_LEN && parcial_value <= MAX_LEN) {
            valeAbs = parcial_value;
        }

        setLen(valeAbs);
        document.querySelector('.bar-range').style.width = `${(valeAbs / MAX_LEN) * 100}%`;
        return;
    };

    const toggleParams = param => {
        const states = {
            'may': { val: mayus, method: setMayus },
            'min': { val: minus, method: setMinus },
            'num': { val: nums, method: setNums },
            'sig': { val: signs, method: setSigns },
        };

        const availables = document.querySelectorAll('.selected').length;

        const parameter = states[param];
        /* si hay dos o mas opciones habilitadas se pueden entonces desavilitar una */
        if (availables >= 2) {
            parameter.method(!parameter.val);
        }
        /* si solo hay una pero no se va desavilitar podemos avilitar una de las demas */
        if (availables === 1 && parameter.val === false) {
            parameter.method(!parameter.val);
        }
    };

    const IconSecurity = () => {
        let icon;
        let messague = "";
        let klass = "";
        if (len === 1) {
            icon = <FaRegThumbsDown />;
            messague = "insegura";
            klass = "pass-bad";
        }
        if (len >= 2 && len <= 4) {
            icon = <FaRegMeh />;
            messague = "muy debil";
            klass = "pass-weak";
        }
        if (len >= 5 && len <= 7) {
            icon = <FaRegSurprise />;
            messague = "debil";
            klass = "pass-weak";
        }
        if (len >= 8 && len <= 12) {
            icon = <FaRegSmileWink />;
            messague = "buena";
            klass = "pass-ok";
        }
        if (len >= 13 && len <= 16) {
            icon = <FaRegSmileBeam />;
            messague = "muy buena";
            klass = "pass-better";
        }
        if (len > 16) {
            icon = <FaRegThumbsUp />
            messague = "exelente";
            klass = "pass-best";
        }

        return (
            <>
                <p className="icon-security-level">{icon}</p>
                <p className={`${klass}`}>
                    <span>{len}</span>
                    {messague}
                </p>
            </>
        );
    };

    const copyOnClip = () => {
        navigator.clipboard.writeText(password);
        alert("contraseña copiada: " + password);
    }

    /* en cada cambio de los param, o del tamaño de la password se genera una nueva */
    useEffect(generatePassword, [len, mayus, minus, nums, signs, refresh]);
    return (
        <>
            <div className="app-container">
                <h1 className="title-app">Generador de contraseña aleatoria</h1>
                <div className="security-level-message">
                    <IconSecurity />
                </div>
                <div className="inputPassword">
                    <InputPassword val={password} />
                    <ButtonNormal click={() => { copyOnClip() }}>
                        <FaRegCopy />
                    </ButtonNormal>
                    <ButtonNormal click={() => { setRef(!refresh) }}>
                        <FaUndoAlt />
                    </ButtonNormal>
                </div>
                <div className="range-bar-length">
                    <div className="control-range">
                        <ButtonNormal click={() => { setValue(-1) }}>
                            <FaMinus />
                        </ButtonNormal>
                        <RangeBar
                            min={MIN_LEN}
                            max={MAX_LEN}
                            value={len}
                            change={() => { setValue(0) }} />
                        <ButtonNormal click={() => { setValue(1) }}>
                            <FaPlus />
                        </ButtonNormal>
                    </div>
                </div>
                <div className="options-buttons">
                    <ButtonCharUsed
                        click={() => { toggleParams('may') }}
                        classBtn={`button-parameters ${mayus ? 'selected' : ''}`.trimEnd()}
                        text="ABC">
                        {mayus ? <FaRegCheckSquare /> : <FaRegSquare />}
                    </ButtonCharUsed>
                    <ButtonCharUsed
                        click={() => { toggleParams('min') }}
                        classBtn={`button-parameters ${minus ? 'selected' : ''}`.trimEnd()}
                        text="abc">
                        {minus ? <FaRegCheckSquare /> : <FaRegSquare />}
                    </ButtonCharUsed>
                    <ButtonCharUsed
                        click={() => { toggleParams('num') }}
                        classBtn={`button-parameters ${nums ? 'selected' : ''}`.trimEnd()}
                        text="123">
                        {nums ? <FaRegCheckSquare /> : <FaRegSquare />}
                    </ButtonCharUsed>
                    <ButtonCharUsed
                        click={() => { toggleParams('sig') }}
                        classBtn={`button-parameters ${signs ? 'selected' : ''}`.trimEnd()}
                        text="#$&">
                        {signs ? <FaRegCheckSquare /> : <FaRegSquare />}
                    </ButtonCharUsed>
                </div>
            </div>
        </>
    );
}