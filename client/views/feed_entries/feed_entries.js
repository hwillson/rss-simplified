Template.feedEntries.helpers({

	/**
	 * Get all feed entries.
	 *
	 * @return  Array  Feed entries.
	 */
	feedEntries: function () {

		return FeedEntries.find({}, { sort: { date: -1 } }).map(function (entry) {

			if (entry.description) {
				// Strip HTML
				entry.description = entry.description.replace(/<(?:.|\n)*?>/gm, '');
			}

			if (entry.date) {
				var formattedDate = moment(entry.date);
				if (formattedDate.isValid()) {
					entry.date = formattedDate.format('YYYY-MM-DD');
				}
			}

			return entry;

		});

	}

});

Template.feedEntries.events({

	// Fade entry row out then remove.
	'click .js-remove': function (e) {
		var $entry = $(e.currentTarget).parent().parent();
    $entry.fadeOut('slow', function () {
			FeedEntries.remove(this._id);
		});
	}

});
