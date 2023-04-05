import { useEffect, useState } from "react";
import styled from "styled-components";

type DeletingTextProps = {
	textOptions: string[];
	holdWait?: number;
	initialWait?: number;
};

const DeletingTextContainer = styled.div`
	font-size: 2.4rem;
	span {
		position: relative;
		&.cursor-blink::after {
			content: "";
			position: absolute;
			right: -2px;
			top: 4px;
			width: 2px;
			height: 80%;
			background-color: #ffffffbf;
		}
	}
`;

export default ({
	textOptions,
	holdWait = 3000,
	initialWait = 1500,
}: DeletingTextProps) => {
	let currentTextOptionIndex = 0;
	const [visibleText, setVisibleText] = useState(
		textOptions[currentTextOptionIndex]
	);
	const [cursorBlink, setCursorBlink] = useState(false);

	let typeInterval: number;
	let blinkInterval: number;

	useEffect(() => {
		let mode: "destroy" | "wait" | "build" = "destroy";
		setTimeout(() => {
			let timeout: number;
			if (!typeInterval) {
				typeInterval = setInterval(() => {
					/* BUILD / DESTROY TEXT */
					setVisibleText((prevVisibleText) => {
						/* SELECT MODE */
						if (prevVisibleText.length === 0) {
							// start building up next word
							mode = "build";
							if (
								currentTextOptionIndex + 1 >=
								textOptions.length
							) {
								currentTextOptionIndex = 0;
							} else {
								currentTextOptionIndex++;
							}
						} else if (
							prevVisibleText.length ===
							textOptions[currentTextOptionIndex].length
						) {
							// wait for a sec and then start deleting current word
							if (mode === "build") {
								mode = "wait";
							}

							if (!timeout && mode === "wait") {
								timeout = setTimeout(() => {
									mode = "destroy";

									clearTimeout(timeout);
									timeout = 0;
								}, holdWait);
							}
						}

						switch (mode) {
							case "build":
								return textOptions[
									currentTextOptionIndex
								].substring(0, prevVisibleText.length + 1);
							case "destroy":
								return textOptions[
									currentTextOptionIndex
								].substring(0, prevVisibleText.length - 1);
							default:
								return prevVisibleText;
						}
					});
				}, 60);
			}
		}, initialWait);

		// blinking mouse and change color
		blinkInterval = setInterval(() => {
			setCursorBlink((prevCursorBlink) => !prevCursorBlink);
		}, 500);

		return () => {
			clearInterval(typeInterval);
			clearInterval(blinkInterval);
		};
	}, []);

	return (
		<DeletingTextContainer className="deleting-text__container">
			Test your knowledge of country{" "}
			<span className={cursorBlink ? "cursor-blink" : ""}>
				{visibleText}
			</span>
		</DeletingTextContainer>
	);
};
