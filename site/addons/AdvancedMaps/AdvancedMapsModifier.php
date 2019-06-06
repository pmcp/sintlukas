<?php

namespace Statamic\Addons\AdvancedMaps;

use Statamic\Extend\Modifier;
use function GuzzleHttp\json_encode;

class AdvancedMapsModifier extends Modifier
{
    private $defaults = [
        'zoom' => 10,
        'height' => '400px',
        'width' => '100%',
        'address' => '',
        'googleStyles' => '',
        'mapboxStyles' => '',
        'mapType' => 'google'
    ];

    /**
     * Modify a value
     *
     * @param mixed  $value    The value to be modified
     * @param array  $params   Any parameters used in the modifier
     * @param array  $context  Contextual values
     * @return mixed
     */
    public function index($value, $params, $context)
    {
        $googleStyles = $value['googleStyles'] ?? $this->defaults['googleStyles'];
        $mapboxStyles = $value['mapboxStyles'] ?? $this->defaults['mapboxStyles'];
        $zoom = $value['zoom'] ?? $this->defaults['zoom'];
        $width = $value['width'] ?? $this->defaults['width'];
        $height = $value['height'] ?? $this->defaults['height'];
        $address = $value['address'] ?? $this->defaults['address'];
        $mapType = $value['mapType'] ?? $this->defaults['mapType'];
        $mapbox_api_key = $this->getConfig('mapbox_api_key');
        return $this->view('partials.map', compact(
            'googleStyles',
            'mapboxStyles',
            'zoom',
            'width',
            'height',
            'address',
            'mapbox_api_key',
            'mapType'
        ));
    }
}
