
<div class="genericContainer">
	<img src="/pfp.jpg">
	<div class="flex">
		<p>
			test
		</p>
	</div>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";


	.genericContainer {
		background: 	var(--backgroundTrans);
		border: 		1px solid var(--accent9);
		border-radius: 	10px;
		overflow: 		hidden;
		padding: 		5px;

		position: 	relative;

		margin: 0 0 10px 0;

		display: flex;

		> * {
			display: flex;
		}

		p {
			padding: 10px;
		}

		img {
			border-radius: 50%;
			height: 120px;
			width: 120px;
		}
	}
</style>