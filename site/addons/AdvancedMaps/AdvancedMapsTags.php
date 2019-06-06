<?php

namespace Statamic\Addons\AdvancedMaps;

use Statamic\Extend\Tags;

class AdvancedMapsTags extends Tags
{
    /**
     * The {{ advanced_maps }} tag
     *
     * @return string|array
     */
    public function index()
    {
        $google_api_key = $this->getConfig('google_api_key');
        $result = '';
        $result .= '<script src="https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js"></script>' . PHP_EOL;
        $result .= $this->js->tag('renderMaps') . PHP_EOL;
        $result .= '<script async defer src="https://maps.googleapis.com/maps/api/js?key=' . $google_api_key . '&callback=advancedMaps" type="text/javascript"></script>' . PHP_EOL;
        $result .= '<link href="https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css" rel="stylesheet" />' . PHP_EOL;
        return $result;
    }
}
