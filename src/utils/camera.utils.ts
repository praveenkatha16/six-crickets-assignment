import { CameraSettings, Range } from "src/models/camera.model";

export function hasCompatibleHardware(
  desiredConfig: CameraSettings,
  cameras: CameraSettings[]
) {
  cameras = cameras.filter(
    ({ light, distance }) =>
      isOverlapingWithDesiredRange(light, desiredConfig.light) &&
      isOverlapingWithDesiredRange(distance, desiredConfig.distance)
  );
  const { light: desiredLightRange, distance: desiredDistanceRange } =
    desiredConfig;

  const lightConfigs = cameras
    .map(({ light }) => light)
    .map(({ start, end }) => ({
      start: clamp(start, desiredLightRange),
      end: clamp(end, desiredLightRange),
    }));

  const distanceConfigs = cameras
    .map(({ distance }) => distance)
    .map(({ start, end }) => ({
      start: clamp(start, desiredDistanceRange),
      end: clamp(end, desiredDistanceRange),
    }));

  const nonOverlappingLightRanges = getNonOverlappingRanges(
    lightConfigs,
    desiredLightRange
  );
  const nonOverlappingDistanceRanges = getNonOverlappingRanges(
    distanceConfigs,
    desiredDistanceRange
  );

  const compatibilityMatrix = createCompatibilityMatrix(
    nonOverlappingLightRanges.length,
    nonOverlappingDistanceRanges.length
  );

  cameras.forEach((camera) => {
    const lightRangeIndex = findRangeIndex(
      nonOverlappingLightRanges,
      camera.light
    );
    const distanceRangeIndex = findRangeIndex(
      nonOverlappingDistanceRanges,
      camera.distance
    );
    for (let i = lightRangeIndex.start; i <= lightRangeIndex.end; i++) {
      for (let j = distanceRangeIndex.start; j <= distanceRangeIndex.end; j++) {
        compatibilityMatrix[i][j] = true;
      }
    }
  });

  for (let i = 0; i < compatibilityMatrix.length; i++) {
    for (let j = 0; j < compatibilityMatrix[i].length; j++) {
      if (compatibilityMatrix[i][j] === false) {
        return false;
      }
    }
  }

  return true;
}

function getNonOverlappingRanges(cameraRanges: Range[], desiredRange: Range) {
  const [milestones, zeroRangePoints] = cameraRanges.reduce(
    ([milestones, zeroRangePoints], { start, end }) => {
      milestones.add(start);
      milestones.add(end);
      if (start === end) {
        zeroRangePoints.add(start);
      }
      return [milestones, zeroRangePoints];
    },
    [new Set<number>([desiredRange.start, desiredRange.end]), new Set<number>()]
  );

  const sortedMileStones = Array.from(milestones).sort();

  for (let i = 0; i < sortedMileStones.length; i++) {
    if (zeroRangePoints.has(sortedMileStones[i])) {
      sortedMileStones.splice(i, 0, sortedMileStones[i]);
      i++;
    }
  }

  return sortedMileStones.reduce((ranges, curr, index, originalArr) => {
    if (index === 0) {
      return ranges;
    }
    ranges.push({ start: originalArr[index - 1], end: curr });
    return ranges;
  }, [] as Range[]);
}

function clamp(value: number, range: Range) {
  return Math.min(Math.max(value, range.start), range.end);
}

function isOverlapingWithDesiredRange(range: Range, desired: Range) {
  return !(range.end < desired.start || range.start > desired.end);
}

function findRangeIndex(ranges: Range[], rangeToFind: Range) {
  let start!: number, end!: number;
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (start === undefined && range.start >= rangeToFind.start) {
      start = i;
    }
    if (range.end === rangeToFind.end) {
      end = i;
      return { start, end };
    }
  }
  return { start, end: ranges.length - 1 };
}

function createCompatibilityMatrix(rows: number, cols: number): boolean[][] {
  return new Array(rows).fill(null).map(() => new Array(cols).fill(false));
}
