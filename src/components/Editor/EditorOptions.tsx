export default function EditorOptions() {
	/*
	 * Invites collaborators to the live session via email.
	 * */
	function handleInviteCollaborator() {
		alert("inviting");
	}

	return (
		<div className="border rounded-sm bg-white py-1 px-4 flex justify-between">
			<div>
				<button className="text-sm mr-2">SAVE</button>
				<button className="text-sm">EDIT</button>
			</div>
			{/* Invite to Collaborator*/}
			<button className="text-sm" onClick={handleInviteCollaborator}>
				INVITE
			</button>
		</div>
	);
}
