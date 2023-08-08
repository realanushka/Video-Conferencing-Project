import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateMail } from "../../shared/utils/validators.js";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions.js";

const AddFriendDialog = ({
	isDialogOpen,
	closeDialogHandler,
	sendFriendInvitation = () => {},
}) => {
	const [mail, setMail] = useState("");
	const [isFormValid, setIsFormValid] = useState("");

	const handleSendInvitation = () => {
		sendFriendInvitation({ targetMailAddress: mail }, handleCloseDialog);
	};
	const handleCloseDialog = () => {
		closeDialogHandler();
		setMail("");
	};

	useEffect(() => {
		setIsFormValid(validateMail(mail));
	}, [mail, setIsFormValid]);
	return (
		<div>
			<Dialog open={isDialogOpen} onClose={handleCloseDialog}>
				<DialogTitle>
					<Typography>Invite a Friend</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography>
							Enter e-mail address of friend which you would like to invite
						</Typography>
					</DialogContentText>
					<InputWithLabel
						label='mail'
						type='text'
						value={mail}
						setValue={setMail}
						placeholder='Enter mail address'
					/>
				</DialogContent>
				<DialogActions>
					<CustomPrimaryButton
						onClick={handleSendInvitation}
						disabled={!isFormValid}
						label='Send'
						additionalStyles={{
							marginLeft: "15px",
							marginRight: "15px",
							marginBottom: "10px",
						}}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapActionToProps = (dispatch) => {
	return {
		...getActions(dispatch),
	};
};

export default connect(null, mapActionToProps)(AddFriendDialog);