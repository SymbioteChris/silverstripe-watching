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


## Credits (OPTIONAL)

Mention dependencies / shoutouts / stackoverflow answers that assisted.

ie.
* [Jonom](https://github.com/jonom/silverstripe-environment-awareness) for the format of this README.md
* [Barakat S](https://github.com/FileZ/php-clamd) for clamd PHP interface
* ["How to Forge" users](https://web.archive.org/web/20161124000346/https://www.howtoforge.com/community/threads/clamd-will-not-start.34559/) for fixing permissions relating to ClamAV
