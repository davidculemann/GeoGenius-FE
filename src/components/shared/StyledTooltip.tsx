import { Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";

const TextOnlyTooltip = withStyles({
	tooltip: {
		backgroundColor: "var(--dark-shade-2)",
		backdropFilter: "blur(1rem)",
	},
	arrow: {
		color: "var(--dark-shade-2)",
		backdropFilter: "blur(1rem)",
	},
})(Tooltip);

export default TextOnlyTooltip;
