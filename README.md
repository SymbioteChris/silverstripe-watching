# SilverStripe Watching

Adds content watching to your site

## Composer Install

```
composer require symbiote/silverstripe-watching:~1.0
```

## Requirements

* SilverStripe 4.1+

## Documentation


### Use with the silverstripe-notifications module

```
SilverStripe\CMS\Model\SiteTree:
  extensions:
    - Symbiote\Watch\Extension\ContentWatchNotification
SilverStripe\Core\Injector\Injector:
  Symbiote\Watch\Extension\ContentWatchNotification: 
    properties:
      watchService: %$Symbiote\Watch\WatchService
      notificationService: %$Symbiote\Notifications\Service\NotificationService
```
