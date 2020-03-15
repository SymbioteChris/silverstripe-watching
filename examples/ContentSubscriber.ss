<% if $CurrentUser %>
<div class="ContentSubscriberHolder js-react" data-init-props='{"itemClass":$ItemClass.JSON, "itemID": "$ItemID", "type": "$SubscribeType"}' data-name="organisms/ContentSubscriber">
    <img src="resources/silverstripe/cms/client/dist/images/loading.gif" alt="Please wait..." />
</div>
<% end_if %>
