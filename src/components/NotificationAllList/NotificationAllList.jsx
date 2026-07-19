import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useStore } from "../../store/useStore";

const NotificationAllList = () => {
	const { notifications, loading } = useStore();

	if (loading) {
		return (
			<Stack alignItems="center" sx={{ mt: 12 }}>
				<CircularProgress />
			</Stack>
		);
	}

	return (
		<Container maxWidth="sm" sx={{ mt: { xs: 10, md: 12 }, mb: 6 }}>
			<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
				Notifications
			</Typography>

			{notifications.length === 0 ? (
				<Stack alignItems="center" spacing={1} sx={{ py: 6 }}>
					<NotificationsNoneOutlinedIcon sx={{ fontSize: 48, color: "text.disabled" }} />
					<Typography color="text.secondary">Aucune notification pour le moment.</Typography>
				</Stack>
			) : (
				<List>
					{notifications.map((notification, index) => (
						<React.Fragment key={notification._id || index}>
							<ListItem disableGutters>
								<ListItemText
									primary={notification.message}
									secondary={
										notification.date
											? new Date(notification.date).toLocaleString("fr-FR")
											: null
									}
								/>
							</ListItem>
							{index < notifications.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			)}
		</Container>
	);
};

export default NotificationAllList;
