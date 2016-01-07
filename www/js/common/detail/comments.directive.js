/**
 * Shows the IT Comments from a ticket <comments ticket="ticket"></comment>
 * Also allows you to insert new comment if you are the IT member whose been assigned to the task.
 */
(function() {
	'use strict';

	angular.module("ticketing")
	.directive('comments',['myUsers',comments]);

	function comments(myUsers) {
		return {
				restrict: 'E',
				bindToController: true,
				controllerAs: 'vmd',
				controller: controller,
				scope:{
					ticket: '='
				},
				templateUrl: 'js/common/detail/comments.html',
			};
		
			//call ang-link if needed
		
			function controller() {
				var vmd = this;
		
				vmd.form = {};
				vmd.form.comment = '';
				vmd.canAdd = canAdd;
				vmd.addComment = addComment;

				activate();
		
				function activate() {
					//directives are singletons, only run once	
				}

				function canAdd() {
					if(vmd.ticket === null){
						return null;
					}
					if(myUsers.getCurrentUser().id === vmd.ticket.it && vmd.ticket.status === 'open'){
						return true;
					}
					return false;
				}

				function addComment() {
					vmd.ticket.addComment(vmd.form.comment);
					vmd.form.comment = '';
				}
			}
	}
})();