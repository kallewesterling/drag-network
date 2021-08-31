"use strict";

/**
 * nodeScale returns the scale for the size of nodes based on some parameters.
 * @param {boolean} sizeFromGraph
 * @param {number} min
 * @param {number} max
 * The return value is a d3 scaleSqrt function.
 */
const nodeScale = (settings = undefined, forText = false, scaleFunc = d3.scaleSqrt()) => {
    if (!settings)
        console.error(
            "Settings must be passed to an iterative function like nodeScale."
        );

    let rangeMin = 0
    let rangeMax = 0;
    if (forText) {
        rangeMin = 10;
        rangeMax = 50;
    } else {
        rangeMin = settings.nodes.minR;
        rangeMax = settings.nodes.maxR
    }

    let domainExtent = [];
    if (settings.nodes.rFrom === "currentDegree") {
        domainExtent = d3.extent(graph.nodes, (node) => node.currentDegree);
    } else if (settings.nodes.rFrom === "degrees__degree") {
        domainExtent = d3.extent(graph.nodes, (node) => node.degrees.degree);
    } else if (settings.nodes.rFrom === "betweenness_centrality") {
        domainExtent = d3.extent(
            graph.nodes,
            (node) => node.centralities.betweenness_centrality_100x
        );
    } else if (settings.nodes.rFrom === "closeness_centrality") {
        domainExtent = d3.extent(
            graph.nodes,
            (node) => node.centralities.closeness_centrality_100x
        );
    } else if (settings.nodes.rFrom === "degree_centrality") {
        domainExtent = d3.extent(
            graph.nodes,
            (node) => node.centralities.degree_centrality_100x
        );
    } else if (settings.nodes.rFrom === "eigenvector_centrality") {
        domainExtent = d3.extent(
            graph.nodes,
            (node) => node.centralities.eigenvector_centrality_100x
        );
    } else {
        domainExtent = [1, 1];
    }

    return scaleFunc.range([rangeMin, rangeMax]).domain(domainExtent);
};

/**
 * edgeScale returns the scale for the weight of edges based on some parameters.
 * @param {object} settings
 * The return value is a d3 scaleSqrt function.
 */
const edgeScale = (settings = undefined, scaleFunc = d3.scaleSqrt()) => {
    if (!settings)
        console.error(
            "Settings must be passed to an iterative function like nodeScale."
        );

    let rangeMin = settings.edges.minStroke;
    let rangeMax = settings.edges.maxStroke;
    let domainExtent = d3.extent(
        graph.edges.map((edge) => edge.weights[settings.edges.weightFrom])
    );
    return scaleFunc.domain(domainExtent).range([rangeMin, rangeMax]);
};
