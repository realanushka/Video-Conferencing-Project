import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";

const MainContainer = styled("div")({
	width: "72px",
	height: "100vh",
	alignItems: "center",
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#202225",
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
	return (
		<MainContainer>
			<MainPageButton />
			<CreateRoomButton isUserInRoom={isUserInRoom} />
			{activeRooms.map(
				(
					room // Curly braces lagayenge to render nhi karega, use brackets - error fixed
				) => (
					<ActiveRoomButton
						roomId={room.roomId}
						creatorUsername={room.creatorUsername}
						amountOfParticipants={room.participants.length}
						key={room.roomId}
						isUserInRoom={isUserInRoom}
					/>
				)
			)}
		</MainContainer>
	);
};

const mapStoreStateToProps = ({ room }) => {
	return {
		...room,
	};
};

export default connect(mapStoreStateToProps)(SideBar);